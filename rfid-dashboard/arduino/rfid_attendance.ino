#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 7

MFRC522 rfid(SS_PIN, RST_PIN);

byte AryanUID[4]  = {0xFA, 0x7B, 0x03, 0x7D};
byte AakashUID[4] = {0xB4, 0x3F, 0xB0, 0x7A};

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) return;
  if (!rfid.PICC_ReadCardSerial()) return;

  Serial.print("UID: ");
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) Serial.print("0");
    Serial.print(rfid.uid.uidByte[i], HEX);
    if (i < rfid.uid.size - 1) Serial.print(" ");
  }

  Serial.print(" | Name: ");

  if (checkUID(rfid.uid.uidByte, AryanUID, 4)) {
    Serial.println("Aryan Kumar Arya");
  } else if (checkUID(rfid.uid.uidByte, AakashUID, 4)) {
    Serial.println("Aakash Tiwari");
  } else {
    Serial.println("Unknown");
  }

  rfid.PICC_HaltA();
  delay(500);
}

bool checkUID(byte *readUID, byte *knownUID, byte size) {
  for (byte i = 0; i < size; i++) {
    if (readUID[i] != knownUID[i]) return false;
  }
  return true;
}
