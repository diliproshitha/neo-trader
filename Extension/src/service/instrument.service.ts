import { Instrument, InstrumentsData } from "../models/instrument";
import * as fs from 'fs';
import * as path from 'path';

export class InstrumentService {
    public static deserializeInstruments(jsonData: string): Instrument[] {
        try {
            const data: InstrumentsData = JSON.parse(jsonData);
            return data.instruments;
        } catch (error) {
            console.error('Error deserializing instruments:', error);
            return [];
        }
    }

    public static getInstrumentsByType(type: string): Instrument[] {
        try {
            const jsonData = fs.readFileSync(path.join(__dirname, '../resources/instruments.json'), 'utf8');
            const instruments = this.deserializeInstruments(jsonData);
            return instruments.filter(instrument => instrument.type === type);
        } catch (error) {
            console.error('Error loading instruments:', error);
            return [];
        }
    }

    public static getInstruments(): Instrument[] {
        try {
            const jsonData = fs.readFileSync(path.join(__dirname, '../resources/instruments.json'), 'utf8');
            return this.deserializeInstruments(jsonData);
        } catch (error) {
            console.error('Error loading instruments:', error);
            return [];
        }
    }



    public static getInstrumentsWithoutUnderscore(): Instrument[] {
        try {
            const jsonData = fs.readFileSync(path.join(__dirname, '../resources/instruments.json'), 'utf8');
            return this.deserializeInstruments(jsonData).map(instrument => ({
                ...instrument,
                name: instrument.name.replace(/_/g, '')
            }));
        } catch (error) {
            console.error('Error loading instruments:', error);
            return [];
        }
    }
}