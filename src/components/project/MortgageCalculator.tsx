"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Info } from "lucide-react";
import { formatPriceFull } from "@/lib/api";

interface MortgageCalculatorProps {
  priceFrom: number;
  currency?: string;
}

export function MortgageCalculator({
  priceFrom,
  currency = "AED",
}: MortgageCalculatorProps) {
  const [price, setPrice] = useState(priceFrom);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(25);

  const loanAmount = price * (1 - downPayment / 100);
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

  const downPaymentAmount = price * (downPayment / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border/50 bg-surface p-6"
    >
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold">Mortgage Calculator</h3>
      </div>
      <p className="mt-1 text-sm text-muted">
        Estimate your monthly payments
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted">Property Price</label>
            <span className="text-sm font-medium">
              {formatPriceFull(price, currency)}
            </span>
          </div>
          <input
            type="range"
            min={priceFrom * 0.8}
            max={priceFrom * 1.5}
            step={50000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-2 w-full accent-accent"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted">Down Payment</label>
            <span className="text-sm font-medium">
              {downPayment}% ({formatPriceFull(downPaymentAmount, currency)})
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={50}
            step={5}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="mt-2 w-full accent-accent"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted">Interest Rate</label>
            <span className="text-sm font-medium">{interestRate}%</span>
          </div>
          <input
            type="range"
            min={2}
            max={8}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="mt-2 w-full accent-accent"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm text-muted">Loan Term</label>
            <span className="text-sm font-medium">{loanTerm} years</span>
          </div>
          <input
            type="range"
            min={5}
            max={25}
            step={1}
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="mt-2 w-full accent-accent"
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-accent/10 p-4">
        <p className="text-sm text-muted">Estimated Monthly Payment</p>
        <p className="mt-1 text-2xl font-bold text-accent">
          {formatPriceFull(Math.round(monthlyPayment), currency)}
          <span className="text-sm font-normal text-muted">/month</span>
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-muted">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <p>
          This is an estimate only. Actual rates and terms depend on your bank
          and eligibility. Contact us for personalized financing options.
        </p>
      </div>
    </motion.div>
  );
}
