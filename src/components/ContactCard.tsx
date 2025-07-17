'use client';

import { Card } from 'react-bootstrap';
import Image from 'next/image';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
type Contact = {
  image: string;
  firstName: string;
  lastName: string;
  address: string;
  description: string;
};

const ContactCard = ({ contact }: { contact: Contact }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={contact.image} width={75} height={75} alt={`${contact.firstName} ${contact.lastName}`} />
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
  </Card>
);

export default ContactCard;
