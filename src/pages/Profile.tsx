
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  }, [user, navigate]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-right mb-8">جاري التحميل...</h1>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-right mb-8">الملف الشخصي</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="space-y-2 text-right">
            <p className="text-gray-600">البريد الإلكتروني</p>
            <p className="text-lg font-medium">{profile.email}</p>
          </div>
          
          <div className="space-y-2 text-right">
            <p className="text-gray-600">الاسم</p>
            <p className="text-lg font-medium">{profile.name || 'غير محدد'}</p>
          </div>
          
          <div className="space-y-2 text-right">
            <p className="text-gray-600">تاريخ التسجيل</p>
            <p className="text-lg font-medium">
              {new Date(profile.created_at).toLocaleDateString('ar-SA')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
