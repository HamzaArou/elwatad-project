
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    // Enable session persistence
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Check for existing session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error('خطأ في البريد الإلكتروني أو كلمة المرور');
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // Sign up the user without email verification
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: window.location.origin,
        },
      });
      
      if (signUpError) throw signUpError;

      // Send welcome email using Edge Function
      try {
        const response = await fetch(`${process.env.SUPABASE_URL}/functions/v1/send-welcome-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email,
            name,
          }),
        });

        if (!response.ok) {
          console.error('Failed to send welcome email');
        }
      } catch (emailError) {
        console.error('Error sending welcome email:', emailError);
      }

    } catch (error: any) {
      console.error('Sign up error:', error);
      if (error.message.includes('already registered')) {
        throw new Error('هذا البريد الإلكتروني مسجل بالفعل');
      }
      throw new Error('حدث خطأ أثناء إنشاء الحساب');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  const toggleFavorite = async (projectId: string) => {
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');

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
