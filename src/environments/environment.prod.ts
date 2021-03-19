export const environment = {
  production: true,
  language: 'en',
  saConnectionString :'BlobEndpoint=https://prodcommunicationsa.blob.core.windows.net/;QueueEndpoint=https://prodcommunicationsa.queue.core.windows.net/;FileEndpoint=https://prodcommunicationsa.file.core.windows.net/;TableEndpoint=https://prodcommunicationsa.table.core.windows.net/;SharedAccessSignature=sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-12-31T14:39:02Z&st=2021-03-01T06:39:02Z&spr=https,http&sig=PcKafK2m5ttPz%2FL5WpEFpqyp%2FjAG2aaUPb%2B93Av6ENI%3D',
  attachmentBlobCS : 'https://prodcommunicationsa.blob.core.windows.net/?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-12-31T14:39:02Z&st=2021-03-01T06:39:02Z&spr=https,http&sig=PcKafK2m5ttPz%2FL5WpEFpqyp%2FjAG2aaUPb%2B93Av6ENI%3D',
  queueName: 'emailqueue',
  attachmentContainerName: 'attachments',
  from:'',
  fromName:'',
  templateInstance: 0,
  email:'info@devoted.ba',
  emailTo:'melina.lutvica@devoted.ba'

};
