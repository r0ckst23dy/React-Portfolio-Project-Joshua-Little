import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSidebarList = props => {
  const portfolioList = props.data.map(portfolioItem => {
    return (
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        <div className="portfolio-thumb-img">
          <img src={portfolioItem.thumb_image_url} />
        </div>

        <div className="text-content">
          <div className="title">{portfolioItem.name}</div>
          <div className="actions" >
            <div className="action-icon">
              <a onClick={() => props.handleEditClick(portfolioItem)}>
                <FontAwesomeIcon icon="edit" />
              </a>
            </div>

            <div className="action-icon">
              <a onClick={() => props.handleDeleteClick(portfolioItem)}>
                <FontAwesomeIcon icon="trash" />
              </a>
            </div>
          </div>
        </div>

      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
};

export default PortfolioSidebarList;
