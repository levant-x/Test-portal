import { Spinner } from "reactstrap";

export default function Preloader() {
  return (
    <div className="d-flex d-flex justify-content-center my-2">
      <Spinner
        color="info"
        size=""
      >
        Loading...
      </Spinner>
    </div>
  )
}