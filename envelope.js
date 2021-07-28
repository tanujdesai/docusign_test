import docusign from 'docusign-esign'

function makeEnvelope(args){
  
    let fileBytes = null;
    // read file from a local directory
    // The read could raise an exception if the file is not available!

    try {
        fileBytes = fs.readFileSync(path.resolve(__dirname, '../../public/uploads/TR2/QuoteSubmittal.pdf'));
    } catch (ex) {
        console.log("Exception error: " + ex)
    }
    
  
    // create the envelope definition
    let env = new docusign.EnvelopeDefinition();
    env.emailSubject = 'Please sign this document';
  
    // add the documents
    let doc1 = new docusign.Document()
      , doc1b64 = Buffer.from(fileBytes).toString('base64');
  
    doc1.documentBase64 = doc1b64;
    doc1.name = 'Lorem Ipsum'; // can be different from actual file name
    doc1.fileExtension = 'pdf';
    doc1.documentId = '3';
  
    // The order in the docs array determines the order in the envelope
    let docs = [];
    docs.push(doc1);
    env.documents = [doc1];
  
    // Create a signer recipient to sign the document, identified by name and email
    // We set the clientUserId to enable embedded signing for the recipient
    // We're setting the parameters via the object creation
    let signer1 = docusign.Signer.constructFromObject({
        email: 'tanujdd@gmail.com',
        name: 'Tanuj Desai',  // may need to change to account-name
        recipientId: 1    
    });
    
    // Create signHere fields (also known as tabs) on the documents,
    // We're using anchor (autoPlace) positioning
    //
    // The DocuSign platform seaches throughout your envelope's
    // documents for matching anchor strings. 
    let signHere1 = docusign.SignHere.constructFromObject({
          anchorString: '/sn1/',
          anchorYOffset: '10', anchorUnits: 'pixels',
          anchorXOffset: '20'})
      ;
  
    // Tabs are set per recipient / signer
    let signer1Tabs = docusign.Tabs.constructFromObject({
      signHereTabs: [signHere1]});
    signer1.tabs = signer1Tabs;
  
    // Add the recipient to the envelope object
    let recipients = docusign.Recipients.constructFromObject({
      signers: [signer1]});
    env.recipients = recipients;
  
    // Request that the envelope be sent by setting |status| to "sent".
    // To request that the envelope be created as a draft, set to "created"
    env.status = 'sent';
  
    return env;
}