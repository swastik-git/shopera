import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {GlobalStyles} from '../../Constants/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import {Cat} from '../../Utils/HardCodedData/AllCategories';
import {useNavigation} from '@react-navigation/native';

const CategorySlider = ({size, color, image, style, setCat}) => {
  const {width, fontScale} = useWindowDimensions();

  const GotoCatScreen = itemData => {
    navigation.navigate('IndivisualCategory', {
      category: itemData.item.cat,
    });
  };

  const renderCatData = itemData => {
    setCat(itemData);
  };

  const RenderFlatList = () => {
    if (style) {
      return (
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={[styles.categorySlider, style]}
          data={Cat}
          renderItem={renderCategories}
          keyExtractor={item => item.key}
          numColumns={4}
        />
      );
    }
    return (
      <FlatList
        style={[styles.categorySlider, style]}
        data={Cat}
        renderItem={renderCategories}
        keyExtractor={item => item.key}
        horizontal
      />
    );
  };
  const navigation = useNavigation();
  const renderCategories = itemData => {
    const RenderIcon = () => {
      if (style) {
        return (
          <Image
            resizeMode="contain"
            source={{uri: itemData.item.image}}
            style={{height: size * 2, width: size * 2, borderRadius: 60}}
          />
        );
      } else {
        if (itemData.item.isMC) {
          return (
            <IconMCI
              name={itemData.item.icon}
              color={color}
              size={size * 1.2}
              style={styles.iconStyle}
            />
          );
        } else {
          return (
            <Icon
              name={itemData.item.icon}
              color={color}
              size={size * 1.2}
              style={styles.iconStyle}
            />
          );
        }
      }
    };
    return (
      <View style={[styles.setView]}>
        <Pressable
          style={({pressed}) => (pressed ? {opacity: 0.75} : null)}
          onPress={
            style
              ? renderCatData.bind(this, itemData.item.cat)
              : GotoCatScreen.bind(this, itemData)
          }>
          <View style={styles.iconBox}>
            <RenderIcon />
          </View>
        </Pressable>
        <Text
          style={[
            styles.setText,
            style && {color: 'black', fontSize: fontScale * 10, padding: 2},
          ]}>
          {itemData.item.cat.length < 10
            ? itemData.item.cat
            : itemData.item.cat.slice(0, 10)}
        </Text>
      </View>
    );
  };
  return <RenderFlatList />;
};

export default CategorySlider;

const styles = StyleSheet.create({
  categorySlider: {
    width: '100%',
  },
  setView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
  },
  setText: {
    // padding: 5,
    color: 'white',
  },
  iconBox: {
    borderWidth: 4,
    borderColor: GlobalStyles.colors.color6,
    width: 60,
    height: 60,
    backgroundColor: GlobalStyles.colors.color4,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {},
});
