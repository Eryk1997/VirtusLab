import React, { Component } from "react";
import { Link } from "react-router-dom";

export function Frame(date) {
  let name = date.name;
  let gender = date.gender;
  let birth_year = date.birth_year;
  let url = date.url;
  let id = url.substr(28);

  return (
    <div className="mt-4 col-sm-12 col-md-6 col-lg-3">
      <div class="card bg-secondary ">
        <div class="card-body text-warning ">
          <h5 class="card-title">{name}</h5>
          <h5 class="card-title">{gender}</h5>
          <h5 class="card-title">{birth_year}</h5>

          <Link to={"/peopleInfo/" + id}>
            <button type="button" className="btn btn-outline-warning">
              More info
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Frame;
