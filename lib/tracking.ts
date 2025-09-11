import { db } from "./firebase"
import { doc, setDoc, getDoc, updateDoc, collection, getDocs, query, orderBy } from "firebase/firestore"

export interface DeliveryData {
  trackingCode: string
  firstName: string
  lastName: string
  email: string
  phone: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  totalAmount: number
  status: "pending" | "confirmed" | "shipped" | "delivered"
  location: string
  notes?: string
  createdAt: Date
  updatedAt: Date
  estimatedDelivery?: Date
}

// Generate unique tracking code
export const generateTrackingCode = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substr(2, 3).toUpperCase()
  return `MAT-${timestamp}-${random}`
}

// Create new delivery record
export const createDelivery = async (
  deliveryData: Omit<DeliveryData, "trackingCode" | "createdAt" | "updatedAt">,
): Promise<string> => {
  const trackingCode = generateTrackingCode()
  const now = new Date()

  const delivery: DeliveryData = {
    ...deliveryData,
    trackingCode,
    createdAt: now,
    updatedAt: now,
  }

  await setDoc(doc(db, "deliveries", trackingCode), delivery)
  return trackingCode
}

// Fetch delivery by tracking code
export const getDelivery = async (trackingCode: string): Promise<DeliveryData | null> => {
  const docRef = doc(db, "deliveries", trackingCode)
  const snapshot = await getDoc(docRef)

  if (snapshot.exists()) {
    const data = snapshot.data()
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      estimatedDelivery: data.estimatedDelivery?.toDate(),
    } as DeliveryData
  }

  return null
}

// Update delivery status (Admin function)
export const updateDeliveryStatus = async (
  trackingCode: string,
  status: DeliveryData["status"],
  location?: string,
): Promise<void> => {
  const docRef = doc(db, "deliveries", trackingCode)
  const updateData: any = {
    status,
    updatedAt: new Date(),
  }

  if (location) {
    updateData.location = location
  }

  await updateDoc(docRef, updateData)
}

// Get all deliveries (Admin function)
export const getAllDeliveries = async (): Promise<DeliveryData[]> => {
  const q = query(collection(db, "deliveries"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      estimatedDelivery: data.estimatedDelivery?.toDate(),
    } as DeliveryData
  })
}
