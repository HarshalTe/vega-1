/* eslint-disable eqeqeq */
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  Label,
  InputGroup,
} from "reactstrap";

import { Formik, Form, Field } from "formik";
import CustomInput from "../../../../../views/custom/CustomInput";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as actions from "../../../../../redux/action";

import { useParams } from "react-router-dom";
import mkt from "../../../../../assets/mkt/newForImg.jpg";

function ReeferMean(props) {
  const accessToken = `${props.login?.login?.token}`;
  const param = useParams();

  let data = {
    token: accessToken,
    id: param?.id,
  };
 let extras={
    "pos2_3": "",
  "pos1_3": "",
  "pos2_2": "",
  "mkt3": "",
  "pos1_2":""
}

  const toggle = () => {
    // props.toggle("area");
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("values in Cases:", values);
    setSubmitting(true);

    values.extras.mkt3 = values.mkt3;

    const user = new FormData();

    user.append("customer_id", values.customer_id);
    user.append("user_id", values.user_id);
    user.append("mkt", values.mkt);
    user.append("mkt2", values.mkt2);
    user.append("extras", JSON.stringify(values.extras));
    console.log("mkt3",values.extras.mkt3=values.mkt3,values.extras)

    console.log("Data of cases:", user);
    props.onUpdateCasesData(data, user, toggle, setSubmitting);

    return;
  };
  return (
    <Card>
      <CardHeader className="bg-success text-white">
        <div className="">
          <i className="fa fa-home mr-1" />
          <strong>Mean Kinetic Temperature (M.K.T) </strong>
        </div>
      </CardHeader>
      <CardBody>
        <div className="m-3">
          {props.cases?.cases
            ?.filter((c) => c.id == param.id)
            .map((user) => {
              return (
                <Formik
                  key={user.id}
                  initialValues={{
                    customer_id: user.customer_id,
                    user_id: user.user_id,
                    mkt: user.mkt ?? "",
                    mkt2: user.mkt2 ?? "",
                    mkt3: user.extras.mkt3 ?? "",
                    extras:user.extras
                  }}
                  onSubmit={handleSubmit}
                  validationSchema={Yup.object().shape({
                    mkt: Yup.string().required("required"),
                  })}
                >
                  {(formProps) => {
                    return (
                      <Form>
                        <Row className="form-group d-flex align-items-end">
                          <Col md={4}>
                            <Label for="mkt">MKT</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="mkt"
                                id="mkt"
                                placeholder="Enter MKT"
                                className={
                                  "form-control" +
                                  (formProps.errors.mkt && formProps.touched.mkt
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col md={4}>
                            <Label for="mkt">MKT 2</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="mkt2"
                                id="mkt2"
                                placeholder="Enter MKT 2"
                                className={
                                  "form-control" +
                                  (formProps.errors.mkt2 &&
                                  formProps.touched.mkt2
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col md={4}>
                            <Label for="mkt">MKT 3</Label>
                            <InputGroup>
                              <Field
                                component={CustomInput}
                                type="text"
                                name="mkt3"
                                id="mkt3"
                                placeholder="Enter MKT 3"
                                className={
                                  "form-control" +
                                  (formProps.errors.mkt3 &&
                                  formProps.touched.mkt3
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                            </InputGroup>
                          </Col>
                          <Col md={3}>
                          </Col>
                          <Col md={6} className="mt-4">
                            <Button
                              type="submit"
                              disabled={formProps.isSubmitting}
                              color="primary"
                              block
                            >
                              Submit
                            </Button>
                          </Col>
                          <Col md={3}>
                          </Col>
                        </Row>
                      </Form>
                    );
                  }}
                </Formik>
              );
            })}
        </div>
        <div className="text-center">
          <h3 style={{ textDecoration: "underline" }}>
            MEAN KINETIC TEMPERATURE (M.K.T)
          </h3>
          <div
            className=""
            style={{ border: "1px solid black", padding: "100px" }}
          >
            {" "}
            {/* ΔH__ -ln (℮ -ΔH/RT1+ ℮ -ΔH/RT2+ … + ℮ -ΔH/RTn ) n{" "} */}
            <img src={mkt} alt="mkt" style={{ maxWidth: "350px" }} />{" "}
          </div>

          <div style={{ border: "1px solid black", padding: "100px" }}>
            <p>
              TK: Mean kinetic temperature in °K ΔH: Activation Energy for
              degradation reaction typically taken as 8.3144 kJ/mole R is the
              universal gas constant = 8.3144x 10-3 kJ per degree per mol T1 to
              Tn are the average temperatures at each of the sample points in °K
              n is the number of temperature sample points
            </p>
            <p>
              M . K . T = {props.editcase?.mkt ?? ""} For Temperature Range :{" "}
              {props.editcase?.min_operating_range}°C to{" "}
              {props.editcase?.max_operating_range}°C{" "}
            </p>
            <p>
              {" "}
              M . K . T = {props.editcase?.mkt2 ?? ""} For Temperature Range :{" "}
              {props.editcase?.min_operating_range1}°C to{" "}
              {props.editcase?.max_operating_range1}°C{" "}
            </p>
            <p>
              {" "}
              M . K . T = {props.editcase?.extras?.mkt3 ?? ""} For Temperature Range :{" "}
              {props.editcase?.min_operating_range2}°C to{" "}
              {props.editcase?.max_operating_range2}°C{" "}
            </p>
            <br />
            <p>
              A single derived temperature that, if maintained over a defined
              period of time, affords the same thermal challenge to a drug
              substance or drug product as would be experienced over a range of
              both higher and lower temperatures for an equivalent defined
              period.{" "}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    cases: state.cases,
    editcase: state.cases.editcase,
    cols: state.cols.cols,
    customer: state.customer.customer,
    rows: state.rows.rows,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCustomerGetData: (data) => dispatch(actions.customerGetData(data)),
    onRowsGetData: (data) => dispatch(actions.rowsGetData(data)),
    onColsGetData: (data) => dispatch(actions.colsGetData(data)),
    onCasesGetData: (data) => dispatch(actions.casesGetData(data)),
    onDeleteCases: (data, id) => dispatch(actions.deleteCases(data, id)),
    onPostCasesData: (data, user, toggle) =>
      dispatch(actions.postCasesData(data, user, toggle)),
    onUpdateCasesData: (data, user, toggle, setSubmitting) =>
      dispatch(actions.updateCasesData(data, user, toggle, setSubmitting)),
    casesEditGetData: (data) => dispatch(actions.casesEditGetData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReeferMean);
