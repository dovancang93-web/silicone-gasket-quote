#!/bin/bash
# Routine 10H sáng: Kiểm tra code style (ESLint)
# Chạy bởi Claude Code Routine tự động

set -e

PROJECT_DIR="/home/user/silicone-gasket-quote"
REPORT_DIR="$PROJECT_DIR/.claude/reports"
DATE=$(date +%Y-%m-%d)
REPORT_FILE="$REPORT_DIR/lint-$DATE.log"

mkdir -p "$REPORT_DIR"

echo "========================================" | tee "$REPORT_FILE"
echo "🔍 LINT REPORT - $DATE $(date +%H:%M)" | tee -a "$REPORT_FILE"
echo "========================================" | tee -a "$REPORT_FILE"

cd "$PROJECT_DIR"

echo "" | tee -a "$REPORT_FILE"
echo "📋 Chạy npm run lint..." | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

if npm run lint 2>&1 | tee -a "$REPORT_FILE"; then
  echo "" | tee -a "$REPORT_FILE"
  echo "✅ LINT SẠCH - Code style đạt chuẩn!" | tee -a "$REPORT_FILE"
else
  echo "" | tee -a "$REPORT_FILE"
  echo "⚠️  CÓ VẤN ĐỀ LINT - Cần sửa code style" | tee -a "$REPORT_FILE"
fi

echo "" | tee -a "$REPORT_FILE"
echo "Report lưu tại: $REPORT_FILE"
