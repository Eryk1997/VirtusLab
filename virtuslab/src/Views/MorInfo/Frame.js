import React, { Component } from "react";

export function Frame(date) {
  return (
    <div className="mt-4 col-sm-12 col-md-6 col-lg-3">
      <div class="card bg-secondary ">
        <div class="card-body text-warning ">{date}</div>
      </div>
    </div>
  );
}

export default Frame;
