import Link from "next/link";
import Card from "react-bootstrap/Card";
import ListingDetails from "@/components/ListingDetails";
import PageHeader from "@/components/PageHeader";

export function getStaticProps() {
  return new Promise((resolve, reject) => {
    fetch("https://drab-blue-bullfrog-boot.cyclic.app/api/listings/10266175")
      .then((res) => res.json())
      .then((data) => {
        resolve({ props: { listing: data } });
      });
  });
}

export default function About(props) {
  return (
    <div>
      <PageHeader text="About The Developer: Jerus Allen Dorotan" />
      <br />
      <Card>
        <Card.Body>
          Hello! My Name is Jerus Allen and I'm currently studying at Seneca
          Newnham College. I'm currently in my fourth semester of the CPA 3-Year
          Program. I like to spend my free time playing video games and hanging
          out with my family and friends. Video Games was also my main
          inspiration as to why I decided to start learning how to code and
          become a programmer. 
        </Card.Body>
        <ListingDetails listing={props.listing} />
      </Card>
    </div>
  );
}
