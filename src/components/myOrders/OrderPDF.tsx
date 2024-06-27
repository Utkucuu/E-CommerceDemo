import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image as PDFImage,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu72xKOzY.woff2",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    fontFamily: "Roboto",
  },
  text: {
    fontSize: 12,
    fontFamily: "Roboto",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

type Product = {
  title: string;
  description: string;
  quantity: number;
  size?: string;
  price: number;
  image: string;
  category: string;
};

type Order = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  products: Product[];
  amount: number;
};

type OrderPDFProps = {
  order: Order;
};

const OrderPDF = ({ order }: OrderPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Order Detail</Text>
        <Text style={styles.text}>Order ID: {order.id}</Text>
        <Text style={styles.text}>Customer Name: {order.name}</Text>
        <Text style={styles.text}>Email: {order.email}</Text>
        <Text style={styles.text}>Phone: {order.phone}</Text>
        <Text style={styles.text}>Address: {order.address}</Text>
        <Text style={styles.text}>Order Date: {order.date}</Text>
        <Text style={styles.text}>Total Amount: ${order.amount}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Products</Text>
        {order.products.map((product, index) => (
          <View key={index} style={styles.section}>
            <PDFImage style={styles.image} src={product.image} />
            <Text style={styles.text}>Title: {product.title}</Text>
            <Text style={styles.text}>Category: {product.category}</Text>
            <Text style={styles.text}>Description: {product.description}</Text>
            <Text style={styles.text}>Quantity: {product.quantity}</Text>
            {product.size && (
              <Text style={styles.text}>Size: {product.size}</Text>
            )}
            <Text style={styles.text}>Price: ${product.price}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default OrderPDF;
