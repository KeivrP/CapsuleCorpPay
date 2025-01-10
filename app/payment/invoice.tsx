import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  
  Image,
} from 'react-native';
import Dropdown from '../../components/ui/Dropdown';


export default function Invoice() {
  const [currency, setCurrency] = useState('idr');
  const [tax, setTax] = useState('10');
  const [discount, setDiscount] = useState('summer');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {/* Invoice Details Section */}
        <View style={styles.leftColumn}>
          <Text style={styles.heading}>Invoice Details</Text>
          <View style={styles.section}>
            <Text style={styles.label}>People</Text>
            <View style={styles.peopleRow}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.personName}>John Smith</Text>
                <Text style={styles.personEmail}>john_s@email.com</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Subject</Text>
            <TextInput style={styles.input} placeholder="Service per June 2023" />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Due Date</Text>
            <TextInput style={styles.input} placeholder="10 November 2023" />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Currency</Text>
            <Dropdown
              options={[
                { label: 'IDR - Indonesian Rupiah', value: 'idr' },
                { label: 'USD - US Dollar', value: 'usd' }
              ]}
              selectedValue={currency}
              onValueChange={(value) => setCurrency(value as string)}
              style={styles.input}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Product</Text>
            <View style={styles.productRow}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }}
                style={styles.productImage}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>Summer 2K23 T-Shirt</Text>
                <Text style={styles.productPrice}>125,000 IDR</Text>
              </View>
              <TextInput
                style={[styles.input, styles.qtyInput]}
                placeholder="1"
              />
              <Dropdown
                options={[
                  { label: '10%', value: '10' },
                  { label: '20%', value: '20' }
                ]}
                selectedValue={tax}
                onValueChange={(value) => setTax(value as string)}
                style={[styles.input, styles.taxPicker]}
              />
            </View>
            <Pressable style={styles.addLineButton}>
              <Text style={styles.addLineText}>Add New Line</Text>
            </Pressable>

            <View style={styles.checkboxRow}>
              <Text>Add Discount</Text>
              <Dropdown
                options={[
                  { label: 'Summer Sale 10%', value: 'summer' }
                ]}
                selectedValue={discount}
                onValueChange={(value) => setDiscount(value as string)}
                style={[styles.input, styles.discountPicker]}
              />
            </View>
          </View>

          <Pressable style={styles.processingButton}>
            <Text style={styles.processingButtonText}>Processing Invoice</Text>
          </Pressable>
        </View>

        {/* Preview Section */}
        <View style={styles.rightColumn}>
          <Text style={styles.heading}>Preview</Text>
          <View style={styles.previewBox}>
            <Text style={styles.previewText}>INV2398-08-087</Text>
            <Text style={styles.previewText}>Due Date: 10 November 2023</Text>
            <Text style={styles.previewText}>Subject: Service per June 2023</Text>
            <Text style={styles.previewText}>Billed To: John Smith</Text>

            <View style={styles.previewProductRow}>
              <Text style={styles.previewProductName}>Summer 2K23 T-Shirt</Text>
              <Text style={styles.previewProductAmount}>125,000 IDR</Text>
            </View>

            <Text style={styles.previewSubtotal}>Subtotal: 125,000 IDR</Text>
            <Text style={styles.previewDiscount}>Discount: -12,500 IDR</Text>
            <Text style={styles.previewTotal}>Total: 112,500 IDR</Text>
          </View>

          <Pressable style={styles.downloadButton}>
            <Text style={styles.downloadText}>Download PDF</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
    marginRight: 8,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#fff',
  },
  peopleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  personName: {
    fontWeight: 'bold',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  productName: {
    fontWeight: 'bold',
  },
  processingButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  processingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  previewBox: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  previewText: {
    fontSize: 14,
    marginBottom: 8,
  },
  previewProductRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  previewSubtotal: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  downloadButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
  },
  downloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  personEmail: {
    color: '#666',
    fontSize: 12,
  },
  productPrice: {
    color: '#666',
    fontSize: 14,
  },
  discountPicker: {
    width: 150,
    height: 40,
  },
  qtyInput: {
    width: 50,
    marginHorizontal: 8,
  },
  taxPicker: {
    width: 80,
  },
  addLineButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  addLineText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  previewProductName: {
    flex: 1,
    fontSize: 14,
  },
  previewProductAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  previewDiscount: {
    color: '#666',
    fontSize: 14,
  },
  previewTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
