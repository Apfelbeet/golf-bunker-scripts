use reqwest::blocking::Client;
use std::{thread, time::Duration};
use wake_on_lan::MagicPacket;

const HOST: &str = "http://192.168.1.67:8000/";
//const WAKE_ADDRESS: &str = "18:C0:4D:B7:2B:56";
const WAKE_ADDRESS: [u8; 6] = [0x18, 0xC0, 0x4D, 0xB7, 0x2B, 0x56];

fn main() {
    let packet = MagicPacket::new(&WAKE_ADDRESS);
    if let Err(e) = packet.send() {
        eprintln!("Failed to send WOL packet: {}", e);
    } else {
        println!("WOL packet sent");
    }

    send_loop();
}

fn send_loop() {
    let client = Client::new();

    loop {
        println!("send");
        if let Err(_) = client.get(HOST).send() {
            println!("failed!");
        }

        thread::sleep(Duration::from_secs(30));
    }
}
