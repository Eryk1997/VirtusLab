import React, { Component } from "react";
import axios from "axios";
import config from "../../Configuration/config";
import Frame from "./Frame";

export default class PeopleInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personInfo: [],
      films: [],
      pom: [],
      elements: [],
    };
  }

  componentDidMount() {
    let idPerson;
    let url;
    let lastIndexPeopleInfo;

    if (window.location.href.includes("/peopleInfo")) {
      url = window.location.href;
      lastIndexPeopleInfo = url.lastIndexOf("/peopleInfo/") + 12;
      idPerson = url.substr(lastIndexPeopleInfo);
    }

    axios
      .get(config.getMoreInfo + idPerson)
      .then((res) => {
        this.setState({ personInfo: res.data }, () => this.setFilms());
      })
      .catch((err) => console.log(err));
  }

  setFilms() {
    let idFilm;
    let lastIndexFilm;

    this.state.personInfo.films.forEach((element) => {
      if (element.includes("/films")) {
        lastIndexFilm = element.lastIndexOf("/films/") + 7;
        idFilm = element.substr(lastIndexFilm);

        axios.get(config.getInfoAboutFilm + idFilm).then((res) => {
          this.setState({ pom: res.data.title }, () => this.show());
        });
      }
    });
  }

  show() {
    this.state.films.push(this.state.pom);

    let elements = this.state.films
      .slice(0, this.state.films.length)
      .map((post) => Frame(post));
    this.setState({ elements: elements });
  }

  render() {
    return (
      <div class="container mt-5">
        <div class="row justify-content-md-center">
          <div class="card bg-secondary text-warning col-sm-12 col-md-6 col-lg-3">
            <div class="col-md-auto">Name: {this.state.personInfo.name}</div>
            <div class="col-md-auto">
              Gender: {this.state.personInfo.gender}
            </div>
            <div class="col-md-auto">
              Birth Year: {this.state.personInfo.birth_year}
            </div>
            <div class="col-md-auto">
              Eye color: {this.state.personInfo.eye_color}
            </div>
            <div class="col-md-auto">
              Height: {this.state.personInfo.height}
            </div>
          </div>
          <div className="col-12 mt-3 text-warning">Title of the films</div>
          <div className="row col-12 ">{this.state.elements}</div>{" "}
        </div>
      </div>
    );
  }
}
