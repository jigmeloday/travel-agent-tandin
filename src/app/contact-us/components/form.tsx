'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SubmitHandler, useForm } from 'react-hook-form';
type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};
function ContactForm(){
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormValues>();
const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    console.log("Form submitted:", data);

    // Example: send data to API
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };
  return(
     <form onSubmit={handleSubmit(onSubmit)} className="text-white my-[42px] space-y-[24px]">
      <div>
        <Input
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Textarea
          placeholder="Message"
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && <p className="text-red-500 mt-1">{errors.message.message}</p>}
      </div>

      <div className="flex items-center justify-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-[42px] font-sans w-full bg-white text-primary rounded-none py-[28px] hover:bg-white/90 cursor-pointer"
        >
          SUBMIT
        </Button>
      </div>
    </form>
  )
}

export default ContactForm;