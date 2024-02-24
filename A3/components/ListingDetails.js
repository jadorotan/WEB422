import { Container, Row, Col } from "react-bootstrap";

export default function ListingDetails(props) {
  return (
    <Container>
      <Row>
        <Col lg>
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/600x400?text=Photo+Not+Available";
            }}
            className="img-fluid w-100"
            src={props.listing.images.picture_url}
            alt="Listing Image"
          />
          <br />
          <br />
        </Col>
        <Col lg>
          <p>{props.listing.neighborhood_overview}</p>
          <br />
          <br />
          <strong>Price:</strong> ${props.listing.price.toFixed(2)}
          <br />
          <strong>Room:</strong> {props.listing.room_type}
          <br />
          <strong>Bed:</strong> {props.listing.bed_type} ({props.listing.beds})
          <br />
          <br />
          <strong>Rating:</strong>{" "}
          {props.listing.review_scores.review_scores_rating}/100 (
          {props.listing.number_of_reviews} Reviews)
          <br />
          <br />
          <br />
        </Col>
      </Row>
    </Container>
  );
}
