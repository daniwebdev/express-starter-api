import * as metadata from 'gcp-metadata';
import { OAuth2Client } from 'google-auth-library'
import { projectID, projectNumber } from '../config/google.config';

export class GoogleService {

    static aud: any;

    static async authVerification(assertion: any) {
        const oAuth2Client = new OAuth2Client();
        if (!assertion) {
            return {};
          }
        
          // Check that the assertion's audience matches ours
          const aud = await this.audience();
        
          // Fetch the current certificates and verify the signature on the assertion
          const response = await oAuth2Client.getIapPublicKeys();
          const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
            assertion,
            response.pubkeys,
            this.aud,
            ['https://cloud.google.com/iap']
          );
          const payload:any = ticket.getPayload();
        
          // Return the two relevant pieces of information
          return {
            email: payload.email,
            sub: payload.sub,
          };
    }

    static async audience() {
        if (!this.aud && (await metadata.isAvailable())) {
          let project_number = await metadata.project(projectNumber); //numeric-project-id
          let project_id = await metadata.project(projectID);
      
          this.aud = '/projects/' + project_number + '/apps/' + project_id;
        }
      
        return this.aud;
      }
}