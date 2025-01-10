import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

interface PropsTarjetaPlato {
  item: {
    image: string;
    name: string;
    price: number;
    description: string;
    tags: string[];
    allergens: string[];
  }
}

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 100) / 2;

export const TarjetaPlato = ({ item }: PropsTarjetaPlato) => (
  <View style={[styles.dishCard, { width: COLUMN_WIDTH  }]}>
  <View style={styles.imageContainer}>
    <Image
      source={{ uri: item.image }}
      style={styles.dishImage}
      defaultSource={require('../../assets/images/missing-image.png')}
    />
    <View style={styles.tagsContainer}>
      {item.tags.map((tag, index) => (
        <View key={index.toPrecision(1)} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  </View>

  <View style={styles.dishInfo}>
    <View style={styles.dishHeader}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
    <Text style={styles.description} numberOfLines={2}>
      {item.description}
    </Text>
    <View style={styles.allergensContainer}>
      {item.allergens?.map((allergen, index) => (
        <View key={index.toPrecision(1)} style={styles.allergenTag}>
          <Text style={styles.allergenText}>{allergen}</Text>
        </View>
      ))}
    </View>
  </View>
</View>
);

const styles = StyleSheet.create({
  dishCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    margin: 8,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
  },
  dishImage: {
    width: '100%',
    height: '100%',
  },
  tagsContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  tag: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 4,
    marginBottom: 4,
  },
  tagText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
  },
  dishInfo: {
    padding: 12,
  },
  dishHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  dishName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  description: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 8,
  },
  allergensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  allergenTag: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  allergenText: {
    fontSize: 10,
    color: '#DC2626',
  },
}); 