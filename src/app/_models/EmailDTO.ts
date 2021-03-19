import { AttachmentDTO } from "./AttachmentDTO";

export class EmailDTO {

    Identifier: string;
    From: string;
    FromName: string;
    To: Array<string>;
    ReplyTo: Array<string>;
    Subject: string;
    Body: string;
    Template: number;

    Attachments: AttachmentDTO[];
}
