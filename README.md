# React.JS Boilerplate (Web Application)

## Description

This is a [`cookiecutter`](https://github.com/cookiecutter/cookiecutter)-compatible boilerplate project.

## Usage

Edit [`cookiecutter.example.json`](cookiecutter.example.json), and then use cookiecutter to compile the project:

```
pip install cookiecutter
cookiecutter ./ --no-input
```

The output project will be in `output` folder.

### Config Variables

`True` & `False` values inside config should be in quotation marks (lowercase, as in JSON) in order for cookiecutter rules to work properly.

| Name                           | Required? | Purpose |
| ---                            | ---       | --- |
| `output`                       | ✔         | Output folder |
| `project_name_pretty`          | ✔         | Full name of the parent project |
| `project_name_pretty_platform` | ✔         | Full name of the repository/project, with platform name (e.g. back end, front end) |
| `project_name_pretty_appello`  | ✔         | Full name of the repo with platform & made by Appello notion |
| `project_name_basic`           | ✔         | Slug for the parent project |
| `project_name_platform`        | ✔         | Slug for the repo/project |
| `s3_bucket_dev`                | ❌        | S3 bucket name for development environment |
| `s3_bucket_stage`              | ❌        | S3 bucket name for staging environment |
| `s3_bucket_prod`               | ❌        | S3 bucket name for production environment |
| `cloudfront_dist_id_dev`       | ❌        | CloudFront distribution ID for development environment |
| `cloudfront_dist_id_stage`     | ❌        | CloudFront distribution ID for staging environment |
| `cloudfront_dist_id_prod`      | ❌        | CloudFront distribution ID for production environment |
