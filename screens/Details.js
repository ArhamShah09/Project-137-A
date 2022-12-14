import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `http://localhost:5000/planet?name=${this.props.navigation.getParam(
        "Star_name"
      )}`
    };
  }
    
  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        this.setDetails(response.data.data);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };
    
  setDetails = starDetails => {
    const starType = starDetails.star_type;
    let imagePath = "";
    switch (starType) {
      case "Gas Giant":
        imagePath = require("../assets/planet_type/gas_giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/planet_type/terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/planet_type/super_earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/planet_type/neptune_like.png");
        break;
      default:
        imagePath = require("../assets/planet_type/gas_giant.png");
    }
    
    this.setState({
      details: starDetails,
      imagePath: imagePath
    });
  };

  render() {

    const { details, imagePath } = this.state;
    if (details.specifications) {
      return(
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >

            <View>
              <Text
                style={styles.cardItem}
              >{`Name of the star : ${details.name}`}
              </Text>

              <Text
                style={styles.cardItem}
              >{`Distance from Earth : ${details.distance}`}
              </Text>

              <Text
                style={styles.cardItem}
              >{`Star Mass : ${details.mass}`}
              </Text>

              <Text
                style={styles.cardItem}
              >{`Star Radius : ${details.radius}`}
              </Text>
            </View>

            <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>{details.specifications ? `Specifications : ` : ""}</Text>

              {details.specifications.map((item, index) => (
                  <Text key={index.toString()} style={{ marginLeft: 50 }}>
                      {item}
                  </Text>
              ))}
            </View>

          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});