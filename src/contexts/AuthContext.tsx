
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
      
      // First, create the auth user and wait for the session
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });
      
      if (authError) {
        console.error('Sign up error:', authError);
        if (authError.message.includes('already registered')) {
          throw new Error('هذا البريد الإلكتروني مسجل بالفعل');
        }
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create user');
      }

      console.log('Auth signup successful:', authData);

      // Wait a moment for the session to be fully established
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Then, create the profile using the service role client
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          name: name,
          email: email,
          role: 'user'
        })
        .select()
        .single();

      if (profileError) {
        console.error('Error creating profile:', profileError);
        // If profile creation fails, we should clean up the auth user
        await supabase.auth.signOut();
        throw new Error('Failed to create user profile');
      }

      setUser(authData.user);
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحباً بك في تطبيقنا",
      });

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
