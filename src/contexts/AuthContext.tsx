
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
    // Check for existing session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Enable session persistence and handle auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
        throw error;
      }

      console.log('Sign in successful:', data);
      setUser(data.user);
    } catch (error: any) {
      console.error('Sign in catch error:', error);
      throw new Error(error.message || 'خطأ في البريد الإلكتروني أو كلمة المرور');
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log('Attempting sign up for:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        if (error.message.includes('already registered')) {
          throw new Error('هذا البريد الإلكتروني مسجل بالفعل');
        }
        throw error;
      }

      console.log('Sign up successful:', data);
      setUser(data.user);

      // Insert into profiles table
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: email,
            name: name,
          });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          throw profileError;
        }
      }

    } catch (error: any) {
      console.error('Sign up catch error:', error);
      throw new Error(error.message || 'حدث خطأ أثناء إنشاء الحساب');
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  const toggleFavorite = async (projectId: string) => {
    if (!user) throw new Error('يجب تسجيل الدخول أولاً');

    try {
      const { data: existingFavorite, error: checkError } = await supabase
        .from('favorites')
        .select()
        .eq('user_id', user.id)
        .eq('project_id', projectId)
        .single();

      if (checkError && !checkError.message.includes('No rows found')) {
        throw checkError;
      }

      if (existingFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('project_id', projectId);
        
        if (error) throw error;
        
        toast({
          description: "تمت إزالة العقار من المفضلة",
        });
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert([{ user_id: user.id, project_id: projectId }]);
        
        if (error) throw error;
        
        toast({
          description: "تمت إضافة العقار إلى المفضلة",
        });
      }
    } catch (error: any) {
      console.error('Toggle favorite error:', error);
      throw new Error('حدث خطأ أثناء تحديث المفضلة');
    }
  };

  const isFavorite = async (projectId: string) => {
    if (!user) return false;

    try {
      const { data: favorite, error } = await supabase
        .from('favorites')
        .select()
        .eq('user_id', user.id)
        .eq('project_id', projectId)
        .single();

      if (error && !error.message.includes('No rows found')) {
        throw error;
      }

      return !!favorite;
    } catch (error) {
      console.error('Check favorite error:', error);
      return false;
    }
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
