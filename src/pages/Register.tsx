import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
const Register = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const {
    signUp,
    signIn,
    user
  } = useAuth();
  const redirectTo = location.state?.redirectTo || '/';
  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      await handleLogin();
    } else {
      await handleSignup();
    }
  };
  const handleSignup = async () => {
    setIsLoading(true);
    try {
      if (!validateEmail(email)) {
        throw new Error('البريد الإلكتروني غير صالح');
      }
      if (password.length < 6) {
        throw new Error('يجب أن تكون كلمة المرور 6 أحرف على الأقل');
      }
      console.log('Starting signup process');
      await signUp(email, password, name);
      console.log('Signup successful');
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحباً بك في تطبيقنا"
      });
      navigate(redirectTo);
    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى."
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (!validateEmail(email)) {
        throw new Error('البريد الإلكتروني غير صالح');
      }
      if (password.length < 6) {
        throw new Error('يجب أن تكون كلمة المرور 6 أحرف على الأقل');
      }
      console.log('Starting login process');
      await signIn(email, password);
      console.log('Login successful');
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك مرة أخرى"
      });
      navigate(redirectTo);
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: error.message || "خطأ في البريد الإلكتروني أو كلمة المرور"
      });
    } finally {
      setIsLoading(false);
    }
  };
  if (user) {
    return null;
  }
  return <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 my-[121px]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center gap-8 mb-8">
          <img src="/lovable-uploads/1f1e6660-2b87-47f7-a630-d9b632edd19e.png" alt="وتد الكيان العقارية" className="h-24 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLoginMode ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} dir="rtl">
            {!isLoginMode && <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  الاسم الكامل
                </label>
                <div className="mt-1">
                  <Input id="name" name="name" type="text" required={!isLoginMode} value={name} onChange={e => setName(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold" disabled={isLoading} />
                </div>
              </div>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                البريد الإلكتروني
              </label>
              <div className="mt-1">
                <Input id="email" name="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold" disabled={isLoading} />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="mt-1">
                <Input id="password" name="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gold focus:border-gold" disabled={isLoading} />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold hover:bg-gold/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold" disabled={isLoading}>
                {isLoading ? 'جاري التحميل...' : isLoginMode ? 'تسجيل الدخول' : 'إنشاء حساب'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isLoginMode ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button type="button" onClick={() => {
              setIsLoginMode(!isLoginMode);
              setName('');
              setEmail('');
              setPassword('');
            }} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gold bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold" variant="outline" disabled={isLoading}>
                {isLoginMode ? 'إنشاء حساب' : 'تسجيل الدخول'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Register;