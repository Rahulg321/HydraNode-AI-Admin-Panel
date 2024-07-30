"use client";

import deleteSingleQuestion from "@/app/actions/DeleteSingleQuestion";
import EditQuestionDialog from "@/components/EditQuestionDialog";
import { QuestionColumns } from "@/components/table/QuestionColumn";
import { QuestionDataTable } from "@/components/table/QuestionDataTable";
import { useToast } from "@/components/ui/use-toast";
import { Question } from "@/lib/types";
import React, { useState } from "react";

const ClientQuestionTable = ({
  data,
  examId,
}: {
  data: Question[];
  examId: string;
}) => {
  const { toast } = useToast();
  const [editDialog, setEditDialog] = useState(false);
  const [question, setQuestion] = useState<Question>({
    id: "",
    question: "",
    answer: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const onEdit = (recievedQuestion: Question) => {
    console.log("clicked the edit button", recievedQuestion);
    setQuestion(recievedQuestion);
    setEditDialog(true);
  };

  const onDelete = async (id: string) => {
    console.log("id of question you want to delete is", id);
    const response = await deleteSingleQuestion(id);
    if (response.success) {
      toast({
        variant: "success",
        description: "Question deleted successfully 🎉",
      });
    } else {
      toast({
        variant: "destructive",
        description: "Could not delete question, Please try again later",
      });
    }
  };

  const updatedQuestionColumns = QuestionColumns({
    onEdit,
    onDelete,
  });

  return (
    <div>
      <QuestionDataTable columns={updatedQuestionColumns} data={data} />
      <EditQuestionDialog
        dialogOpen={editDialog}
        dialogOpenChange={setEditDialog}
        question={question}
        examId={examId}
      />
    </div>
  );
};

export default ClientQuestionTable;
