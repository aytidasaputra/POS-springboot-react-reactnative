import React, { Component } from "react";
import Header from "../../component/header";
import { Card, Icon, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Chart from "./Chart";
class Home extends Component {
  render() {
    return (
      <div>
        <Header>
          <Card.Group>
            <Card style={{ width: "282px", height: "280px" }}>
              <Image
                src="https://www.berdesa.com/wp-content/uploads/2016/04/160418-Berdesa-2.jpg"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>ITEMS</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>All item in inventory.</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Menu.Item as={Link} to="/items">
                  <Icon name="location arrow" />
                  go to items
                </Menu.Item>
              </Card.Content>
            </Card>
            <Card style={{ width: "282px", height: "280px" }}>
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDocd9ug2yeUDKgXVhXgAqV00Go1LR36eUU_mP40FFEgXzcsMo&usqp=CAU"
                style={{ height: "165px" }}
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>UNITS</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>All units in items.</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Menu.Item as={Link} to="/units">
                  <Icon name="location arrow" />
                  go to units
                </Menu.Item>
              </Card.Content>
            </Card>
            <Card style={{ width: "282px", height: "280px" }}>
              <Image
                style={{ height: "160px" }}
                src="https://cdn.datafloq.com/cache/blog_pictures/878x531/what-is-blockchain-transactions-smart-contracts.jpg"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>TRANSACTIONS</Card.Header>
                <Card.Description>Transactions inventory..</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Menu.Item as={Link} to="/transactions">
                  <Icon name="location arrow" />
                  go to transactions
                </Menu.Item>
              </Card.Content>
            </Card>
            <Card style={{ width: "282px", height: "280px" }}>
              <Image
                style={{ height: "165px" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR8zy-NvC8YNhbuSZPYXuh8jgEdFaiZjhDlA7URaaLWprWFr9L5&usqp=CAU"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>STOCKS</Card.Header>
                <Card.Meta></Card.Meta>
                <Card.Description>
                  All inventory in this application.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Menu.Item as={Link} to="/stocks">
                  <Icon name="location arrow" />
                  go to stocks
                </Menu.Item>
              </Card.Content>
            </Card>
          </Card.Group>
          <br></br>
          <br></br>
          <div>
            <h1>TRANSACTIONS SUMMARY</h1>
            <Chart />
          </div>
        </Header>
      </div>
    );
  }
}

export default Home;
