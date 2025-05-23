"use client";

import React from "react";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

export default function CurrencySelector({
  selectedCurrency,
  onCurrencyChange,
}: CurrencySelectorProps) {
  return (
    <select
      className="bg-muted border border-border border-r-0 flex items-center px-3 text-muted-foreground rounded-l-md"
      value={selectedCurrency}
      onChange={(e) => onCurrencyChange(e.target.value)}
    >
      <option value="₹">₹</option>
      <option value="$">$</option>
      <option value="€">€</option>
      <option value="£">£</option>
    </select>
  );
}
