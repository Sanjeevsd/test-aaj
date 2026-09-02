"use client";

import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Hammer, Key } from "lucide-react";
import type { PaymentPlan } from "@/lib/types";

interface HandoverTimelineProps {
  handoverDate: string;
  completionPercentage: number;
  paymentPlan: PaymentPlan[];
}

export function HandoverTimeline({
  handoverDate,
  completionPercentage,
  paymentPlan,
}: HandoverTimelineProps) {
  const milestones = [
    {
      icon: CheckCircle2,
      title: "Project Launch",
      status: "completed" as const,
      date: "Completed",
    },
    {
      icon: Hammer,
      title: "Under Construction",
      status:
        completionPercentage >= 100
          ? ("completed" as const)
          : ("active" as const),
      date: `${completionPercentage}% complete`,
    },
    {
      icon: Calendar,
      title: "Expected Handover",
      status: "upcoming" as const,
      date: handoverDate,
    },
    {
      icon: Key,
      title: "Move In",
      status: "upcoming" as const,
      date: handoverDate,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-border/50 bg-surface p-6"
    >
      <h3 className="text-lg font-semibold">Project Timeline</h3>
      <p className="mt-1 text-sm text-muted">
        Track construction progress and key milestones
      </p>

      <div className="mt-4 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Construction Progress</span>
          <span className="font-semibold text-accent">
            {completionPercentage}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-elevated">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${completionPercentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
          />
        </div>
      </div>

      <div className="relative space-y-0">
        {milestones.map((milestone, i) => {
          const Icon = milestone.icon;
          const isLast = i === milestones.length - 1;
          return (
            <div key={milestone.title} className="relative flex gap-4 pb-8">
              {!isLast && (
                <div
                  className={`absolute left-[15px] top-8 h-full w-0.5 ${
                    milestone.status === "completed"
                      ? "bg-accent"
                      : "bg-border"
                  }`}
                />
              )}
              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  milestone.status === "completed"
                    ? "bg-accent text-background"
                    : milestone.status === "active"
                      ? "bg-accent/20 text-accent ring-2 ring-accent"
                      : "bg-surface-elevated text-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="pt-1">
                <p
                  className={`text-sm font-medium ${
                    milestone.status === "upcoming"
                      ? "text-muted"
                      : "text-foreground"
                  }`}
                >
                  {milestone.title}
                </p>
                <p className="text-xs text-muted">{milestone.date}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 border-t border-border/50 pt-6">
        <h4 className="text-sm font-semibold">Payment Plan</h4>
        <div className="mt-3 space-y-2">
          {paymentPlan.map((plan) => (
            <div
              key={plan.label}
              className="flex items-center justify-between rounded-lg bg-surface-elevated/50 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{plan.label}</p>
                <p className="text-xs text-muted">{plan.milestone}</p>
              </div>
              <span className="text-sm font-bold text-accent">
                {plan.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
