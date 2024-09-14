// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useTransition } from "react";
// import {
//   EditQuestionFormSchema,
//   EditQuestionZodType,
// } from "@/app/schemas/EditQuestionSchema";
// import editSingleQuestion from "@/app/actions/EditSingleQuestion";
// import { useToast } from "./ui/use-toast";
// import { Question } from "@prisma/client";

// type EditQuestionDialogProps = {
//   question: Question;
//   dialogOpen: boolean;
//   dialogOpenChange: (value: boolean) => void;
//   examId: string;
// };

// const EditQuestionDialog = ({
//   question,
//   dialogOpen,
//   examId,
//   dialogOpenChange,
// }: EditQuestionDialogProps) => {
//   const { toast } = useToast();
//   const [isPending, startTransition] = useTransition();
//   console.log("question in edit dialog is ", question);

//   const form = useForm<EditQuestionZodType>({
//     resolver: zodResolver(EditQuestionFormSchema),
//     defaultValues: {
//       question: question.question,
//       answer: question.answer,
//       option1: question.option1,
//       option2: question.option2,
//       option3: question.option3,
//       option4: question.option4,
//     },
//   });

//   useEffect(() => {
//     form.reset({
//       question: question.question,
//       answer: question.answer,
//       option1: question.option1,
//       option2: question.option2,
//       option3: question.option3,
//       option4: question.option4,
//     });
//   }, [question, form]);

//   function onSubmit(values: EditQuestionZodType) {
//     console.log("form values are", values);
//     console.log("exam id is", examId);

//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     startTransition(async () => {
//       const response = await editSingleQuestion(
//         {
//           ...values,
//           id: question.id,
//         },
//         examId
//       );
//       if (response.success) {
//         toast({
//           variant: "success",
//           description: "Question edited successfully 🎉",
//         });
//         dialogOpenChange(false);
//       }
//       if (response.error) {
//         toast({
//           variant: "destructive",
//           description: "Could not edit question, Please try again later",
//         });
//         dialogOpenChange(false);
//       }
//     });
//   }

//   return (
//     <Dialog open={dialogOpen} onOpenChange={dialogOpenChange}>
//       <DialogContent className="max-h-[90vh] w-full max-w-6xl overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Edit Question Details</DialogTitle>
//           <DialogDescription>
//             Change the exam details and Click on save button to save the
//             changes.
//           </DialogDescription>
//           <div>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="grid grid-cols-2 gap-4"
//               >
//                 <div className="">
//                   <FormField
//                     control={form.control}
//                     name="question"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Question</FormLabel>
//                         <FormControl>
//                           <Input placeholder="cloud engineer..." {...field} />
//                         </FormControl>
//                         <FormDescription>Enter a topic name.</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="answer"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Answer</FormLabel>
//                       <FormControl>
//                         <Input placeholder="45 minutes" {...field} />
//                       </FormControl>
//                       <FormDescription>
//                         Enter the answer for the question.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="option1"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Option 1</FormLabel>
//                       <FormControl>
//                         <Input placeholder="something" {...field} />
//                       </FormControl>
//                       <FormDescription>
//                         Change the first option.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="option2"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Option 2</FormLabel>
//                       <FormControl>
//                         <Input placeholder="something" {...field} />
//                       </FormControl>
//                       <FormDescription>
//                         Change the second option.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="option3"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Option 3</FormLabel>
//                       <FormControl>
//                         <Input placeholder="something" {...field} />
//                       </FormControl>
//                       <FormDescription>
//                         Change the third option.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="option4"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Option 4</FormLabel>
//                       <FormControl>
//                         <Input placeholder="something" {...field} />
//                       </FormControl>
//                       <FormDescription>
//                         Change the fourth option.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <Button
//                   type="submit"
//                   className="w-full col-span-2"
//                   disabled={isPending}
//                 >
//                   {isPending ? "Saving Changes...." : "Save Changes"}
//                 </Button>
//               </form>
//             </Form>
//           </div>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EditQuestionDialog;
