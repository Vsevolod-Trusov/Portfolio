export interface INotesForm {
  handleSubmit: (values: INotesValues) => Promise<void> | void;
}

export interface INotesValues {
  id: number | string;
  title: string;
  description: string;
  dateCreation: Date | string;
  author: string;
}
