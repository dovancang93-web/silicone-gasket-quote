#!/bin/bash
# Routine 20H tối: Kiểm tra build cuối ngày + tóm tắt tổng
# Chạy bởi Claude Code Routine tự động

PROJECT_DIR="/home/user/silicone-gasket-quote"
REPORT_DIR="$PROJECT_DIR/.claude/reports"
DATE=$(date +%Y-%m-%d)
REPORT_FILE="$REPORT_DIR/final-build-$DATE.log"

mkdir -p "$REPORT_DIR"

echo "========================================" | tee "$REPORT_FILE"
echo "🌙 FINAL BUILD REPORT - $DATE $(date +%H:%M)" | tee -a "$REPORT_FILE"
echo "========================================" | tee -a "$REPORT_FILE"

cd "$PROJECT_DIR"

# Đếm số commit trong ngày
COMMIT_COUNT=$(git log --since="$DATE 00:00" --oneline 2>/dev/null | wc -l)
echo "" | tee -a "$REPORT_FILE"
echo "📊 Tổng commit hôm nay: $COMMIT_COUNT" | tee -a "$REPORT_FILE"

# Chạy lint trước
echo "" | tee -a "$REPORT_FILE"
echo "🔍 Chạy lint..." | tee -a "$REPORT_FILE"
LINT_OK=true
npm run lint 2>&1 | tee -a "$REPORT_FILE" || LINT_OK=false

# Chạy build
echo "" | tee -a "$REPORT_FILE"
echo "🔨 Chạy build cuối ngày..." | tee -a "$REPORT_FILE"
BUILD_OK=true
npm run build 2>&1 | tee -a "$REPORT_FILE" || BUILD_OK=false

# Tóm tắt cuối
echo "" | tee -a "$REPORT_FILE"
echo "========================================" | tee -a "$REPORT_FILE"
echo "📋 KẾT QUẢ CUỐI NGÀY" | tee -a "$REPORT_FILE"
echo "========================================" | tee -a "$REPORT_FILE"

if $LINT_OK; then
  echo "✅ Lint: PASS" | tee -a "$REPORT_FILE"
else
  echo "❌ Lint: FAIL" | tee -a "$REPORT_FILE"
fi

if $BUILD_OK; then
  echo "✅ Build: PASS" | tee -a "$REPORT_FILE"
else
  echo "❌ Build: FAIL" | tee -a "$REPORT_FILE"
fi

echo "" | tee -a "$REPORT_FILE"
echo "Report lưu tại: $REPORT_FILE"
