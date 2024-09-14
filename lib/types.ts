export type Question = {
  id: string;
  question: string;
  explanation?: string;
  answer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
};
export type CSVQuestion = {
  question_text: string; // The question text
  answer_1?: string; // The first answer, optional since it may not always exist
  answer_2?: string; // The second answer, optional for MCQ where only one answer exists
  type: "MCQ" | "multi-select"; // The type of question, either multiple choice (MCQ) or multi-select
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
  option_6: string;
  explanation_1: string;
  explanation_2: string;
  explanation_3: string;
  explanation_4: string;
  explanation_5: string;
  explanation_6: string;
  overall_explanation: string;
};

export type BaseQuestion = {
  question_text: string;
  type: "MCQ" | "multi-select";
  overall_explanation: string;
};

export type MCQQuestion = BaseQuestion & {
  type: "MCQ";
  option_1: string; // The first option for the question
  option_2: string; // The second option
  option_3: string; // The third option
  option_4: string;

  explanation_1: string;
  explanation_2: string;
  explanation_3: string;
  explanation_4: string;

  answer_1: string;
  answer_2?: string;
};

export type MultiSelectQuestion = BaseQuestion & {
  type: "multi-select";
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  option_5: string;
  option_6: string;
  explanation_1: string;
  explanation_2: string;
  explanation_3: string;
  explanation_4: string;
  explanation_5: string;
  explanation_6: string;

  answer_1: string;
  answer_2: string;
};
