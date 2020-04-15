import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = props => {
  const portfolioList = props.data.map(portfolioItem => {
    return (
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        <div className="portfolio-thumb-img">
          <img src={portfolioItem.thumb_image_url} />
        </div>

        <div className="title-delete-icon-wrapper">
          <div className="title">{portfolioItem.name}</div>
          <div className="delete-icon">
            <a onClick={() => props.handleDeleteClick(portfolioItem)}>
              <FontAwesomeIcon icon="trash" />
            </a>
          </div>
        </div>

      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;
