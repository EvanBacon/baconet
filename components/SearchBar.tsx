import React from "react";
import { Platform, StyleSheet, TextInput, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "./icon";

class SearchBar extends React.PureComponent {
  componentDidMount() {
    requestAnimationFrame(() => {
      this._textInput.focus();
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      text: props.value,
    };
  }

  render() {
    let searchInputStyle = {
      color: this.props.theme === "dark" ? "white" : "black",
    };
    if (this.props.textColor) {
      searchInputStyle.color = this.props.textColor;
    }
    if (this.props.textFontFamily) {
      searchInputStyle.fontFamily = this.props.textFontFamily;
    }

    return (
      <div style={styles.container}>
        <TextInput
          ref={(view) => {
            this._textInput = view;
          }}
          placeholder="Search"
          placeholderTextColor={this.props.placeholderTextColor || "#ccc"}
          value={this.props.value}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor={this.props.selectionColor}
          underlineColorAndroid={this.props.underlineColorAndroid || "#ccc"}
          onSubmitEditing={this._handleSubmit}
          onChangeText={this._handleChangeText}
          style={[styles.searchInput, searchInputStyle]}
        />
        <div
          style={{ width: 50, alignItems: "center", justifyContent: "center" }}
        >
          {this.state.text ? (
            <TouchableOpacity
              onPress={this._handleClear}
              hitSlop={{ top: 15, left: 10, right: 15, bottom: 15 }}
              style={{ padding: 5 }}
            >
              <Icon
                name="close"
                width={25}
                height={25}
                fill={searchInputStyle.color}
              />
            </TouchableOpacity>
          ) : null}
        </div>
      </div>
    );
  }

  _handleClear = () => {
    this._handleChangeText("");
  };
  _handleChangeText = (text) => {
    this.setState({ text });
    this.props.onChangeQuery && this.props.onChangeQuery(text);
  };

  _handleSubmit = () => {
    let { text } = this.state;
    this.props.onSubmit && this.props.onSubmit(text);
    this._textInput.blur();
  };
}

export default function (props: {
  value?: string;
  onSubmit: (text: string) => void;
  textFontFamily?: string;
  textColor?: string;
  selectionColor?: string;
  tintColor?: string;
  onChangeQuery?: (text: string) => void;
}) {
  const navigation = useNavigation();
  const theme = useColorScheme();
  return <SearchBar {...props} theme={theme} navigation={navigation} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    minWidth: 320,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 5,
    margin: 8,
    ...Platform.select({
      web: {
        outlineColor: "transparent",
      },
    }),
  },
});
