import React from "react";

import SHOP_DATA from "./shop-data.js";
import ShopCollection from "../../components/shop-collection/shop-collection.component";

class ShopPage extends React.Component {
  constructor() {
    super();

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="container">
        {collections.map(({ id, title, routeName, items }) => {
          return (
            <ShopCollection
              key={id}
              title={title}
              routeName={routeName}
              items={items}
            />
          );
        })}
      </div>
    );
  }
}

export default ShopPage;
