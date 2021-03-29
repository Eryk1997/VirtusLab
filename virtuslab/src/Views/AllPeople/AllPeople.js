import React, { Component } from "react";
import axios from "axios";
import config from "../../Configuration/config";
import Frame from "./Frame";
import ReactPaginate from "react-paginate";
import "./style.css";

export default class AllPeople extends Component {
  state = {
    people: [],
    offset: 0,
    perPage: 10,
    elements: [],
    currentPage: 1,
    pom: [],
  };

  constructor(props) {
    super(props);
    this.Click = this.Click.bind(this);
  }

  receiveData(currentPage = 1, perPage = 10) {
    if (currentPage == 1) {
      axios
        .get(config.getAllPeople + currentPage)
        .then((json) =>
          this.setState(
            {
              people: json.data.results,
            },
            () => this.setElementsForCurrentPage()
          )
        )
        .catch((err) => console.log(err));
    } else {
      axios
        .get(config.getAllPeople + currentPage)
        .then((json) =>
          this.setState({ pom: json.data.results }, () =>
            this.setElementsForCurrentPage(perPage)
          )
        )
        .catch((err) => console.log(err));
    }
  }

  componentDidMount() {
    this.receiveData();
  }

  setElementsForCurrentPage(perPage = 10) {
    this.state.pom.forEach((element) => this.state.people.push(element));

    let elements = this.state.people
      .slice(this.state.offset, this.state.offset + perPage)
      .map((post) => Frame(post));
    this.setState({ elements: elements });
  }

  Click() {
    let page = this.state.currentPage + 1;
    let pomPerPage = this.state.perPage + 5;

    this.setState((state, props) => ({
      currentPage: state.currentPage + 1,
      perPage: state.perPage + 5,
    }));

    this.receiveData(page, pomPerPage);

  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row col-12" id="padding-lef">
          {this.state.elements}
        </div>

        <button type="button" className="mt-5 mb-5 btn btn-outline-warning" onClick={this.Click}>
          More
        </button>
      </div>
    );
  }
}
