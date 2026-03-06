---
title: "Automate Google Sheets with PHP - Inventory Sync"
date: "2025-03-22"
tags: "PHP, Google Sheets API, Automation"
readTime: "8 min read"
excerpt: "A step-by-step PHP + Google Sheets API integration for real-time inventory and order tracking."
---

# Automate Google Sheets with PHP — Inventory Sync

At Kankatala Textiles, we synced our inventory and orders to Google Sheets so non-technical staff could monitor everything in real time without needing database access.

## Setup

```bash
composer require google/apiclient
```

Create a Service Account in Google Cloud Console, download the JSON key, and share your Sheet with the service account email.

## Write Data to Sheet

```php
<?php
$client = new Google\Client();
$client->setAuthConfig('service-account.json');
$client->addScope(Google\Service\Sheets::SPREADSHEETS);
$service = new Google\Service\Sheets($client);

$rows = [['Product', 'Stock', 'Last Updated']];
foreach ($inventoryItems as $item) {
    $rows[] = [
        $item['name'],
        $item['qty'],
        date('d/m/Y H:i', strtotime($item['updated_at']))
    ];
}

$body = new Google\Service\Sheets\ValueRange(['values' => $rows]);
$service->spreadsheets_values->update(
    $spreadsheetId, 'Sheet1!A1',
    $body, ['valueInputOption' => 'RAW']
);
```

## Schedule with CRON

```bash
# Sync every 15 minutes
*/15 * * * * php /var/www/html/sync-sheets.php >> /var/log/sync.log 2>&1
```

> Use batch writes for large datasets — 10x faster than row-by-row API calls.

This saved hours of manual data entry every week at Kankatala!
