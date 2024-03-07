export interface HttpResponse<resp> {
    response: resp;
    code: number;
    message: string;
    status: boolean;
  }
  