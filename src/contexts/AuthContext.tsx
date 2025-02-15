
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  toggleFavorite: (projectId: string) => Promise<void>;
  isFavorite: (projectId: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
    if (signUpError) throw signUpError;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const toggleFavorite = async (projectId: string) => {
    if (!user) throw new Error('Must be logged in');

    const { data: existingFavorite } = await supabase
      .from('favorites')
      .select()
      .eq('user_id', user.id)
      .eq('project_id', projectId)
      .single();

    if (existingFavorite) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('project_id', projectId);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert([{ user_id: user.id, project_id: projectId }]);
      if (error) throw error;
    }
  };

  const isFavorite = async (projectId: string) => {
    if (!user) return false;

    const { data: favorite } = await supabase
      .from('favorites')
      .select()
      .eq('user_id', user.id)
      .eq('project_id', projectId)
      .single();

    return !!favorite;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
