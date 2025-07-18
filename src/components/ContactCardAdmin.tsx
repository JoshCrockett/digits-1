
import { Card, Image } from 'react-bootstrap';
import { Contact } from '@prisma/client';

/* Renders a single Contact. See list/page.tsx. */
type Contact = {
  image?: string;
  firstName: string;
  lastName: string;
  address?: string;
  description?: string;
};

interface ContactCardAdminProps {
  contact: Contact;
}

const ContactCardAdmin: React.FC<ContactCardAdminProps> = ({ contact }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image ?? ''} width={75} />
      <Card.Title>
        {contact.firstName}
     &nbsp;
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
    <Card.Footer className="blockquote-footer">
      {/* You can add footer content here if needed */}
    </Card.Footer>
  </Card>
);

export default ContactCardAdmin;
