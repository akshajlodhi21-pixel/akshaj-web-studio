import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, transactionId } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Direct UPI / Manual UTR verification check
    if (transactionId && !razorpay_payment_id) {
      // Manual verification policy: Server will never mark unverified UTRs as automatically successful
      return NextResponse.json(
        {
          success: false,
          verified: false,
          status: "Pending Verification",
          message:
            "Manual UPI transactions undergo bank ledger reconciliation by administration. Submitted records remain in 'Pending Verification' status until authorized.",
        },
        { status: 200 }
      );
    }

    // Razorpay Automated Signature Verification
    if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      if (!keySecret) {
        return NextResponse.json(
          {
            success: false,
            verified: false,
            message: "Razorpay Key Secret not configured in environment.",
          },
          { status: 500 }
        );
      }

      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      const isSignatureValid = generatedSignature === razorpay_signature;

      if (isSignatureValid) {
        return NextResponse.json({
          success: true,
          verified: true,
          status: "Verified",
          paymentId: razorpay_payment_id,
          message: "Payment successfully verified by Razorpay cryptographic signature.",
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            verified: false,
            status: "Rejected",
            message: "Cryptographic signature mismatch. Transaction cannot be verified.",
          },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Insufficient transaction parameters supplied." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Payment verification API error:", error);
    return NextResponse.json(
      { error: "Server-side payment verification failed." },
      { status: 500 }
    );
  }
}
