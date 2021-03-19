import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService } from '../_services/communication.service';
import { QueueClient } from '@azure/storage-queue';
import { environment } from 'src/environments/environment';
import { EmailDTO } from '../_models/EmailDTO';
import { v4 as uuid } from 'uuid';
import { AnonymousCredential, BlobServiceClient, newPipeline, } from '@azure/storage-blob';
import { AttachmentDTO } from '../_models/AttachmentDTO';

@Component({
	selector: 'app-contact-page',
	templateUrl: './contact-page.component.html',
	styleUrls: ['./contact-page.component.css'],
})
export class ContactPageComponent implements OnInit {
	queueClient: QueueClient;
	title: string;
	emailSent: boolean = false;
	emailFailed: boolean = false;
	attachmentArray: File[];
	contactForm: FormGroup;
	emailDTO: EmailDTO = new EmailDTO();


	constructor(
		private fb: FormBuilder,
		communicationService: CommunicationService) {
		communicationService.content.subscribe((data) => {
			if (this.contactForm != undefined) {
				this.contactForm.patchValue({
					spanTitle: data
				});
			}
		});
		this.attachmentArray = [];
	}

	ngOnInit() {
		this.contactForm = this.fb.group({
			spanTitle: ['', Validators.required],
			spanFullName: ['', Validators.required],
			spanEmail: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]],
			spanMessage: ['', Validators.required],
			spanUpload: ['', Validators.nullValidator],
		});
		this.queueClient = new QueueClient(
			environment.saConnectionString,
			environment.queueName
		);
		this.attachmentArray = [];
		this.emailSent = false;
	}

	get registerFormControl() {
		return this.contactForm.controls;
	}

	async onSubmit() {

		try {
			this.emailSent = false;
			if (!this.contactForm.valid) {
				this.contactForm.markAllAsTouched();
				return;
			}
			if (this.attachmentArray.length != 0) {
				this.emailDTO.Attachments = [];
				this.attachmentArray.forEach(async (file: File) => {
					let attachment: AttachmentDTO = {
						name: file.name,
						fileType: file.type,
						blobName: uuid(),
						size: file.size,
					};
					this.uploadFile(file, attachment.blobName);
					this.emailDTO.Attachments.push(attachment);
				});
			}
			this.emailDTO.Identifier = uuid();
			this.emailDTO.From = environment.email;
			this.emailDTO.FromName = this.contactForm.get('spanFullName')?.value;
			this.emailDTO.To = new Array<string>();
			this.emailDTO.To.push(environment.emailTo);
			this.emailDTO.ReplyTo = new Array<string>();
			this.emailDTO.ReplyTo.push(this.contactForm.get('spanEmail')?.value);
			this.emailDTO.Template = environment.templateInstance;
			this.emailDTO.Body = this.contactForm.get('spanMessage')?.value;
			this.emailDTO.Subject = this.contactForm.get('spanTitle')?.value;

			var objString = JSON.stringify(this.emailDTO);
			await this.queueClient.sendMessage(btoa(objString));
			this.contactForm.reset();

			this.emailSent = true;
			this.attachmentArray = [];
		}
		catch (error) {
			this.emailFailed = true;
			this.emailSent = false;
			this.attachmentArray = [];
		}
		setTimeout(() => {
			this.emailSent = false;
			this.emailFailed = false;
		}, 3000);
	}

	async uploadFile(file: File, blobname: string) {
		const pipeline = newPipeline(new AnonymousCredential(), {
			retryOptions: {
				maxTries: 4
			},
			userAgentOptions: {
				userAgentPrefix: 'AdvancedSample V1.0.0'
			},
			keepAliveOptions: {
				enable: false,
			},
		});
		const blobServiceClient = new BlobServiceClient(
			environment.attachmentBlobCS,
			pipeline
		);
		const containerClient = blobServiceClient.getContainerClient(environment.attachmentContainerName);
		await containerClient.uploadBlockBlob(blobname, file, file.size);
	}

	uploadfiles(files: any) {
		for (let index = 0; index < files.length; index++) {
			this.attachmentArray.push(files[index]);
		}
	}

	deleteAttachment(index) {
		this.attachmentArray.splice(index, 1);
	}
}