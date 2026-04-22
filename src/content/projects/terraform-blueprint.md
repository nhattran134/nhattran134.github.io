---
title: 'Multi-Cloud Terraform Pipeline'
description: 'Reusable Terraform CI/CD pipeline with multiple workflows and composite actions supporting AWS, Azure, and GCP.'
tags: ['Terraform', 'GitHub Actions', 'AWS', 'Azure', 'GCP']
date: '2026-02-01'
---

## Overview

A reusable Terraform pipeline blueprint with validate, plan, scan, and apply stages for AWS, Azure, and GCP.

## Technical Highlights

- Multiple reusable workflows with composable actions
- OIDC authentication — no stored credentials
- Integrated security scanning for compliance and misconfigurations
- Environment protection rules with approval gates
- Semantic versioning for consumers to pin to stable releases

## Pipeline Flow

Discover → Resolve Backend → Validate → Plan → Scan → Apply
