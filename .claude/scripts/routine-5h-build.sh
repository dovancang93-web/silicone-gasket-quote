#!/bin/bash
# Routine 5H sáng: Kiểm tra build TypeScript
# Chạy bởi Claude Code Routine tự động

set -e

PROJECT_DIR="/home/user/silicone-gasket-quote"
REPORT_DIR="$PROJECT_DIR/.claude/reports"
DATE=$(date +%Y-%m-%d)
REPORT_FILE="$REPORT_DIR/build-$DATE.log"

mkdir -p "$REPORT_DIR"

echo "========================================" | tee "$REPORT_FILE"
echo "🔨 BUILD REPORT - $DATE $(date +%H:%M)" | tee -a "$REPORT_FILE"
echo "========================================" | tee -a "$REPORT_FILE"

cd "$PROJECT_DIR"

echo "" | tee -a "$REPORT_FILE"
echo "📦 Chạy npm run build..." | tee -a "$REPORT_FILE"
echo "" | tee -a "$REPORT_FILE"

if npm run build 2>&1 | tee -a "$REPORT_FILE"; then
  echo "" | tee -a "$REPORT_FILE"
  echo "✅ BUILD THÀNH CÔNG - Không có lỗi TypeScript!" | tee -a "$REPORT_FILE"
else
  echo "" | tee -a "$REPORT_FILE"
  echo "❌ BUILD THẤT BẠI - Xem chi tiết lỗi ở trên" | tee -a "$REPORT_FILE"
fi

echo "" | tee -a "$REPORT_FILE"
echo "Report lưu tại: $REPORT_FILE"
