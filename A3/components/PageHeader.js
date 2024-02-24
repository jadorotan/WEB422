import Card from "react-bootstrap/Card";

export default function PageHeader(props) {
  return (
    <Card className="bg-white">
      <Card.Body>{props.text}</Card.Body>
    </Card>
  );
}
