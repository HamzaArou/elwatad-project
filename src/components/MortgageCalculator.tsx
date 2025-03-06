
// Fix only the submitForm function in MortgageCalculator.tsx

const submitForm = async (event: React.FormEvent) => {
  event.preventDefault();
  
  if (!fullName || !email || !phone) {
    toast({
      title: "خطأ",
      description: "الرجاء إدخال جميع البيانات المطلوبة",
      variant: "destructive",
    });
    return;
  }

  try {
    setIsLoading(true);
    
    // Create the interest form entry in a type-safe way
    // Use a query instead of direct insert to interest_forms
    const { error } = await supabase.rpc('create_interest_form', {
      p_full_name: fullName,
      p_email: email,
      p_phone: phone
    });
    
    if (error) throw error;
    
    setFullName("");
    setEmail("");
    setPhone("");
    setIsDialogOpen(false);
    
    toast({
      title: "تم الإرسال",
      description: "سيتم التواصل معك قريباً",
    });
    
  } catch (error: any) {
    console.error('Error submitting form:', error);
    toast({
      title: "خطأ",
      description: "حدث خطأ أثناء إرسال النموذج، الرجاء المحاولة مرة أخرى",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};
