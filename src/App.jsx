import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const [selectedItem, setSelectedItem] = useState(products[0].code);
  const [ppu, setPpu] = useState(products[0].price);
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [dataItems, setDataItems] = useState([]);

  // Update PPU when selected item changes
  useEffect(() => {
    const item = products.find((v) => v.code === selectedItem);
    if (item) {
      setPpu(item.price);
    }
  }, [selectedItem]);

  const addItem = () => {
    const item = products.find((v) => v.code === selectedItem);

    if (item) {
      const newItem = {
        item: item.name,
        ppu: parseFloat(ppu),
        qty: parseInt(qty, 10),
        discount: parseFloat(discount) || 0,
      };

      setDataItems([...dataItems, newItem]);
    }
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    const newDataItems = dataItems.filter((_, i) => i !== index);
    setDataItems(newDataItems);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              <Form.Label>Item</Form.Label>
              <Form.Select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
              >
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                value={ppu}
                readOnly // PPU is read-only based on selected item
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                min="1"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                min="0"
                step="0.01"
              />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearDataItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
