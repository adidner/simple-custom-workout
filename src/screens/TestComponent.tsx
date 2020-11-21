import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { createGuid } from "../Utils";
 
const exampleData = [...Array(20)].map((d, index) => ({
  key: `item-${index}`, // For example only -- don't use index as your key!
  label: index,
  backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${index *
    5}, ${132})`
}));
 
class TestComponent extends Component {
  state = {
    data: exampleData
  };
 
  renderItem = (item: any, index: any, drag: any, isActive: any) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? "blue" : item.backgroundColor,
          alignItems: "center",
          justifyContent: "center"
        }}
        onLongPress={drag}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: 32
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
 
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={this.state.data}
          renderItem={({ item, index, drag, isActive }) => this.renderItem(item, index, drag, isActive)}
          keyExtractor={(item, index) => {return createGuid()}}
          onDragEnd={({ data }) => this.setState({ data })}
        />
      </View>
    );
  }
}
 
export default TestComponent;